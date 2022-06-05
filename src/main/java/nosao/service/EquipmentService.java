package nosao.service;

import nosao.entity.Equipment;
import nosao.exception.NotFoundException;
import nosao.exception.UnprocessableEntityException;
import nosao.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository repository;

    public List<Equipment> getEquipmentByType(String type) {
        return repository.findByType(type);
    }

    public List<Equipment> getEquipmentByTypeAndNameLike(String type, String name) {
        return repository.findByTypeAndNameLike(type, name);
    }

}
