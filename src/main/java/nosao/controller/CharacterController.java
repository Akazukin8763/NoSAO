package nosao.controller;

import nosao.entity.Character;
import org.springframework.http.MediaType;
import nosao.parameter.CharacterQueryParameter;
import nosao.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping(value = "/characters", produces = MediaType.APPLICATION_JSON_VALUE)
public class CharacterController {

    @Autowired
    private CharacterService characterService;

//    @GetMapping("/{id}")
//    public ResponseEntity<Character> getCharacter(@PathVariable("id") String id) {
//        Character character = characterService.getCharacter(id);
//        return ResponseEntity.ok(character);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Character>> getCharacters(@ModelAttribute CharacterQueryParameter param) {
//        List<Character> characters = characterService.getCharacters(param);
//        return ResponseEntity.ok(characters);
//    }
//
//    @GetMapping("/test")
//    public ResponseEntity<Character> getCharactersByName(String name) {
//        System.out.println("test");
//        System.out.println(name);
//        Character character = characterService.getCharacterByName(name);
//        return ResponseEntity.ok(character);
//    }
//
//    @PostMapping
//    public ResponseEntity<Character> createCharacter(@RequestBody Character request) {
//        Character character = characterService.createCharacter(request);
//
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(character.getId())
//                .toUri();
//
//        return ResponseEntity.created(location).body(character);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Character> replaceCharacter(
//            @PathVariable("id") String id, @RequestBody Character request) {
//        Character character = characterService.replaceCharacter(id, request);
//        return ResponseEntity.ok(character);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity deleteCharacter(@PathVariable("id") String id) {
//        characterService.deleteCharacter(id);
//        return ResponseEntity.noContent().build();
//    }

}
