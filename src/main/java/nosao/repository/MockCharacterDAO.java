package nosao.repository;

import nosao.entity.Character;
import nosao.parameter.CharacterQueryParameter;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class MockCharacterDAO {

    private final List<Character> charactersDB = new ArrayList<>();

    @PostConstruct
    private void initDB() {
        charactersDB.add(new Character("0001","奧伯龍", "精靈王",
                null, null, null, null,
                null, null,
                1719, 76, 39, 127, 67));

    }

    public Character insert(Character character) {
        charactersDB.add(character);
        return character;
    }

    public Character replace(String id, Character character) {
        Optional<Character> characterOp = find(id);
        characterOp.ifPresent(p -> {
            p.setName(character.getName());
            p.setDescription(character.getDescription());
        });

        return character;
    }

    public void delete(String id) {
        charactersDB.removeIf(p -> p.getId().equals(id));
    }

    public Optional<Character> find(String id) {
        return charactersDB.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    public List<Character> find(CharacterQueryParameter param) {
        String keyword = Optional.ofNullable(param.getKeyword()).orElse("");
        String orderBy = param.getOrderBy();
        String sortRule = param.getSortRule();
        Comparator<Character> comparator = genSortComparator(orderBy, sortRule);

        return charactersDB.stream()
                .filter(p -> p.getName().contains(keyword))
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    private Comparator<Character> genSortComparator(String orderBy, String sortRule) {
        Comparator<Character> comparator = (p1, p2) -> 0;
        if (Objects.isNull(orderBy) || Objects.isNull(sortRule)) {
            return comparator;
        }

        if (orderBy.equalsIgnoreCase("price")) {
            comparator = Comparator.comparing(Character::getDescription);
        } else if (orderBy.equalsIgnoreCase("name")) {
            comparator = Comparator.comparing(Character::getName);
        }

        return sortRule.equalsIgnoreCase("desc")
                ? comparator.reversed()
                : comparator;
    }
}
