package nosao.repository;

import nosao.entity.Character;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends MongoRepository<Character, String> {

    // Overwrite: Optional<Character> findById(String id)
    @Query("{'_id': ?0}")
    Character _findById(String id);

    @Query("{'name': ?0}")
    Character findByName(String name);

    @Query(value="{'name': ?0}", fields="{'_id': 0, 'description': 1}")
    Character findByNameIncludeDescription(String name);

    @Query(value="{'name': ?0}", fields="{'_id': 0, 'ability': 1}")
    Character findByNameIncludeAbility(String name);

}