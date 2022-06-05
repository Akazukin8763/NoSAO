package nosao.service;

import nosao.entity.Character;
import nosao.entity.Equipments;
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

    // Search
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

    // Insert
    public Character createCharacter(String name) {
        if (null != getCharacterByName(name))
            return null;
        else {
            Character character = new Character();

            character.setName(name);

            return repository.insert(character);
        }
    }

    // Update
    public Character updateCharacterDescription(String id, String description) {
        Character character = getCharacterById(id);

        character.setDescription(description);

        return repository.save(character);
    }

    public Character updateCharacterEquipments(String id, Equipments equipments) {
        Character character = getCharacterById(id);

        character.setEquipments(equipments);

        return repository.save(character);
    }

    // Delete
//    public void deleteCharacter(String id) {
//        repository.deleteById(id);
//    }

}
