package nosao.repository;

import nosao.entity.Equipment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends MongoRepository<Equipment, String> {

    @Query("{'type': ?0}")
    List<Equipment> findByType(String type);

    @Query("{'type': ?0, 'name': {$regex: ?1}}")
    List<Equipment> findByTypeAndNameLike(String type, String name);

}