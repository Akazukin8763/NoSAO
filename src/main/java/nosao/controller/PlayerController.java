package nosao.controller;

import nosao.entity.*;
import nosao.entity.Character;
import nosao.service.CharacterService;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/player", produces = MediaType.APPLICATION_JSON_VALUE)
public class PlayerController {

    @Autowired
    private CharacterService characterService;

    @PostMapping("/getCharacters")
    public ResponseEntity<Response<List<Character>>> getCharacters() {
        List<Character> characters = characterService.getCharacters();

        Response<List<Character>> response;
        if (characters.size() == 0)
            response = new Response<>(null, false, "No one survived");
        else
            response = new Response<>(characters, true);

        return ResponseEntity.ok(response);
    }

}