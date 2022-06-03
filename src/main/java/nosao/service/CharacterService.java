package nosao.service;

import nosao.entity.Character;
import nosao.exception.NotFoundException;
import nosao.exception.UnprocessableEntityException;
import nosao.parameter.CharacterQueryParameter;
import nosao.repository.CharacterRepository;
import nosao.repository.MockCharacterDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository repository;

//    public Character getCharacter(String id) {
//        return repository.findById(id)
//                .orElseThrow(() -> new NotFoundException("Can't find character."));
//    }
//
//    public List<Character> getCharacters(CharacterQueryParameter param) {
//        return repository.findAll();
//    }

    public Character getCharacterByName(String name) {
        return repository.findByName(name);
    }

//    public Character createCharacter(Character request) {
//        Character character = new Character();
//        character.setName(request.getName());
//        character.setDescription(request.getDescription());
//
//        return repository.insert(character);
//    }
//
//    public Character replaceCharacter(String id, Character request) {
//        Character oldCharacter = getCharacter(id);
//
//        Character character = new Character();
//        character.setId(oldCharacter.getId());
//        character.setName(request.getName());
//        character.setDescription(request.getDescription());
//
//        return repository.save(character);
//    }
//
//    public void deleteCharacter(String id) {
//        repository.deleteById(id);
//    }

}
