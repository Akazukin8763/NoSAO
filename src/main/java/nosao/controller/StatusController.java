package nosao.controller;

import nosao.entity.*;
import nosao.entity.Character;
import nosao.service.CharacterService;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/status", produces = MediaType.APPLICATION_JSON_VALUE)
public class StatusController {

    @Autowired
    private CharacterService characterService;

    @PostMapping("/getCharacterDescription")
    public ResponseEntity<Response<String>> getCharactersDescriptionByName(String name) {
        Character character = characterService.getCharacterDescriptionByName(name);

        Response<String> response;
        if (null == character)
            response = new Response<>(null, false, "Account not existed");
        else
            response = new Response<>(character.getDescription(), true, "Account not existed");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/getCharacterEquipments")
    public ResponseEntity<Response<Equipments>> getCharactersEquipmentsByName(String name) {
        Character character = characterService.getCharacterEquipmentsByName(name);

        Response<Equipments> response;
        if (null == character)
            response = new Response<>(new Equipments(), false, "Account not existed");
        else
            response = new Response<>(character.getEquipments(), true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/getCharacterAbility")
    public ResponseEntity<Response<Ability>> getCharactersAbilityByName(String name) {
        Character character = characterService.getCharacterAbilityByName(name);

        Response<Ability> response;
        if (null == character)
            response = new Response<>(null, false, "Account not existed");
        else
            response = new Response<>(character.getAbility(), true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/updateCharacterDescription")
    public ResponseEntity<Response<Object>> updateCharacterDescription(String id, String description) {
        Character character = characterService.updateCharacterDescription(id, description);

        Response<Object> response;
        if (null == character)
            response = new Response<>(null, false, "Update description failed");
        else
            response = new Response<>(null, true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/updateCharacterEquipments")
    public ResponseEntity<Response<Object>> updateCharacterEquipments(String id,
                                                                      String helmet, String chestplate, String vambrace, String cuish,
                                                                      String main, String sub) {
        Character character = characterService.updateCharacterEquipments(id, new Equipments(
                                                                                    new Armor(helmet, chestplate, vambrace, cuish),
                                                                                    new Weapon(main, sub)));

        Response<Object> response;
        if (null == character)
            response = new Response<>(null, false, "Update equipments failed");
        else
            response = new Response<>(null, true);

        return ResponseEntity.ok(response);
    }

}