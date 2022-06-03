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

}


