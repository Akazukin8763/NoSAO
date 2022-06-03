package nosao.controller;

import nosao.entity.Status;
import nosao.entity.Character;
import nosao.entity.Ability;
import nosao.service.CharacterService;

import org.springframework.data.util.Pair;
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
    public ResponseEntity<Pair<Status, String>> getCharactersDescriptionByName(String name) {
        Character character = characterService.getCharacterDescriptionByName(name);

        Pair<Status, String> response;
        if (null == character)
            response = Pair.of(new Status(false, "Account not existed"), "");
        else
            response = Pair.of(new Status(true), character.getDescription());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/getCharacterAbility")
    public ResponseEntity<Pair<Status, Ability>> getCharactersAbilityByName(String name) {
        Character character = characterService.getCharacterAbilityByName(name);

        Pair<Status, Ability> response;
        if (null == character)
            response = Pair.of(new Status(false, "Account not existed"), new Ability());
        else
            response = Pair.of(new Status(true), character.getAbility());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/updateCharacterDescription")
    public ResponseEntity<Status> getCharactersAbilityByName(String id, String description) {
        Character character = characterService.updateCharacter(id, description);

        Status response;
        if (null == character)
            response = new Status(false, "更新 Description 失敗");
        else
            response = new Status(true);

        return ResponseEntity.ok(response);
    }

}