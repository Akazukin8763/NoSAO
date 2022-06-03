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

//    public List<Character> getCharacters(CharacterQueryParameter param) {
//        return repository.findAll();
//    }

    public Character getCharacterById(String id) {
        return repository._findById(id);
    }

    public Character getCharacterByName(String name) {
        return repository.findByName(name);
    }

    public Character getCharacterDescriptionByName(String name) {
        return repository.findByNameIncludeDescription(name);
    }

    public Character getCharacterEquipmentsByName(String name) {
        return repository.findByNameIncludeEquipments(name);
    }

    public Character getCharacterAbilityByName(String name) {
        return repository.findByNameIncludeAbility(name);
    }

//    public Character createCharacter(Character request) {
//        Character character = new Character();
//        character.setName(request.getName());
//        character.setDescription(request.getDescription());
//
//        return repository.insert(character);
//    }

    public Character updateCharacter(String id, String description) {
        Character character = getCharacterById(id);

        character.setDescription(description);

        return repository.save(character);
    }

//    public void deleteCharacter(String id) {
//        repository.deleteById(id);
//    }

}
