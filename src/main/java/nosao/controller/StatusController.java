package nosao.controller;

import nosao.entity.Response;
import nosao.entity.Character;
import nosao.entity.Equipments;
import nosao.entity.Ability;
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
    public ResponseEntity<Response<Object>> getCharactersAbilityByName(String id, String description) {
        Character character = characterService.updateCharacter(id, description);

        Response<Object> response;
        if (null == character)
            response = new Response<>(null, false, "更新 Description 失敗");
        else
            response = new Response<>(null, true);

        return ResponseEntity.ok(response);
    }

}