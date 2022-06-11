package nosao.controller;

import nosao.entity.Status;
import nosao.entity.Character;
import nosao.service.CharacterService;

import org.springframework.data.util.Pair;
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
    public ResponseEntity<Pair<Status, Character>> getCharactersByName(String name) {
        Character character = characterService.getCharacterByName(name);

        Pair<Status, Character> response;
        if (null == character)
            response = Pair.of(new Status(false, "Account not existed"), new Character());
        else
            response = Pair.of(new Status(true), character);

        return ResponseEntity.ok(response);
    }

}


