package nosao.service;

import nosao.entity.Ability;
import nosao.entity.Character;
import nosao.entity.Equipments;
import nosao.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository repository;

    // Search
    public List<Character> getCharacters() {
        return repository.findAll();
    }

    public Character getCharacterById(String id) {
        return repository._findById(id);
    }

    public Character getCharacterByName(String name) {
        return repository.findByName(name);
    }

    public Character getCharacterIdByName(String name) { return repository.findByNameIncludeId(name); }

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

    public Character createCharacterWithAbility(String name, int health, int attack, int defense, int reaction, int agile) {
        if (null != getCharacterByName(name))
            return null;
        else {
            Character character = new Character();

            character.setName(name);
            character.setAbility(new Ability(health, attack, defense, reaction, agile));

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
    public void deleteCharacter(String id) {
        repository.deleteById(id);
    }

}
