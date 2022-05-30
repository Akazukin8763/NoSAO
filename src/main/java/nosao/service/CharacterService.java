package nosao.service;

import nosao.entity.Character;
import nosao.exception.NotFoundException;
import nosao.exception.UnprocessableEntityException;
import nosao.parameter.CharacterQueryParameter;
import nosao.repository.MockCharacterDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {

    @Autowired
    private MockCharacterDAO characterDAO;

    public Character createCharacter(Character request) {
        boolean isIdDuplicated = characterDAO.find(request.getId()).isPresent();
        if (isIdDuplicated) {
            throw new UnprocessableEntityException("The id of the character is duplicated.");
        }

        Character character = new Character();
        character.setId(request.getId());
        character.setName(request.getName());
        character.setDescription(request.getDescription());

        return characterDAO.insert(character);
    }

    public Character getCharacter(String id) {
        return characterDAO.find(id)
                .orElseThrow(() -> new NotFoundException("Can't find character."));
    }

    public Character replaceProduct(String id, Character request) {
        Character character = getCharacter(id);
        return characterDAO.replace(character.getId(), request);
    }

    public void deleteCharacter(String id) {
        Character character = getCharacter(id);
        characterDAO.delete(character.getId());
    }

    public List<Character> getCharacters(CharacterQueryParameter param) {
        return characterDAO.find(param);
    }

}
