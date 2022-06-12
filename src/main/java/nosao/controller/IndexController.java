package nosao.controller;

import nosao.entity.Response;
import nosao.entity.Character;
import nosao.service.CharacterService;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
public class IndexController {

    @Autowired
    private CharacterService characterService;

    @PostMapping("/login")
    public ResponseEntity<Response<Character>> getCharactersByName(String name) {
        Character character = characterService.getCharacterByName(name);

        Response<Character> response;
        if (null == character)
            response = new Response<>(null, false, "Account not existed");
        else
            response = new Response<>(character, true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/registerCharacter")
    public ResponseEntity<Response<Object>> createCharacter(String name, int health, int attack, int defense, int reaction, int agile) {
        Character character = characterService.createCharacterWithAbility(name, health, attack, defense, reaction, agile);

        Response<Object> response;
        if (null == character)
            response = new Response<>(null, false, "Duplicated name");
        else
            response = new Response<>(null, true);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/deleteCharacter")
    public ResponseEntity<Response<Object>> deleteCharacter(String id) {
        characterService.deleteCharacter(id);

        Response<Object> response = new Response<>(null, true);

        return ResponseEntity.ok(response);
    }

}


