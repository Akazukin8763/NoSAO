package nosao.controller;

import nosao.entity.Ability;
import nosao.entity.CharacterEquipmentInfo;
import nosao.entity.Response;
import nosao.entity.Equipment;
import nosao.service.EquipmentService;

import com.mongodb.BasicDBObject;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/equipment", produces = MediaType.APPLICATION_JSON_VALUE)
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @Resource
    private MongoTemplate mongoTemplate;

    private final List<AggregationOperation> lookupEquipment = new ArrayList<>(
        List.of(
                Aggregation.lookup("equipment", "equipments.armor.helmet", "name", "current_equipment"),
                Aggregation.lookup("equipment", "equipments.armor.chestplate", "name", "current_equipment"),
                Aggregation.lookup("equipment", "equipments.armor.vambrace", "name", "current_equipment"),
                Aggregation.lookup("equipment", "equipments.armor.cuish", "name", "current_equipment"),
                Aggregation.lookup("equipment", "equipments.weapon.main", "name", "current_equipment"),
                Aggregation.lookup("equipment", "equipments.weapon.sub", "name", "current_equipment")
        )
    );

    // Search
    @PostMapping("/getEquipmentByType")
    public ResponseEntity<Response<List<Equipment>>> getEquipmentByType(String type) {
        List<Equipment> equipment = equipmentService.getEquipmentByType(type);

        Response<List<Equipment>> response;
        if (null == equipment)
            response = new Response<>(null, false, "Type error");
        else
            response = new Response<>(equipment, true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/getEquipmentByTypeAndNameLike")
    public ResponseEntity<Response<List<Equipment>>> getEquipmentByTypeAndNameLike(String type, String name) {
        List<Equipment> equipment = equipmentService.getEquipmentByTypeAndNameLike(type, name);

        Response<List<Equipment>> response;
        if (null == equipment)
            response = new Response<>(null, false, "Equipment not found");
        else
            response = new Response<>(equipment, true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/getCharacterEquipmentInfo")
    public ResponseEntity<Response<CharacterEquipmentInfo>> getCharacterEquipmentInfo(String name) {
        CharacterEquipmentInfo info = new CharacterEquipmentInfo(name);

        AggregationOperation unwind = Aggregation.unwind("current_equipment");
        AggregationOperation match = Aggregation.match(Criteria.where("name").is(name));
        AggregationOperation project = Aggregation.project("name", "current_equipment");

        for (AggregationOperation lookup : lookupEquipment) {
            Aggregation aggregation = Aggregation.newAggregation(lookup, unwind, match, project);
            AggregationResults<BasicDBObject> result = mongoTemplate.aggregate(aggregation, "character", BasicDBObject.class);

            try {
                BasicDBObject object = BasicDBObject.parse(((Document) result.getMappedResults().get(0).get("current_equipment")).toJson());
                BasicDBObject ability = BasicDBObject.parse(object.get("ability").toString());

                Equipment equipment = new Equipment(
                        object.get("_id").toString(),
                        object.get("type").toString(),
                        object.get("name").toString(),
                        object.get("img").toString(),
                        new Ability((int) ability.get("health"),
                                (int) ability.get("attack"),
                                (int) ability.get("defense"),
                                (int) ability.get("reaction"),
                                (int) ability.get("agile")));

                info.insertEquipment(equipment);
            }
            catch (Exception ignored) {
                // Nothing
            }
        }

        return ResponseEntity.ok(new Response<>(info, true));
    }

}