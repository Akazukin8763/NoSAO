package nosao.repository;

import nosao.entity.Character;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends MongoRepository<Character, String> {

    @Query("{'name': ?0}")
    Character findByName(String name);

}