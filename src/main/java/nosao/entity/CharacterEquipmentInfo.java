package nosao.entity;

import java.util.ArrayList;
import java.util.List;

public class CharacterEquipmentInfo {

    private String name;
    private List<Equipment> equipmentList;

    public CharacterEquipmentInfo() {
        this("", new ArrayList<>());
    }

    public CharacterEquipmentInfo(String name) {
        this(name, new ArrayList<>());
    }

    public CharacterEquipmentInfo(String name, List<Equipment> equipmentList) {
        this.name = name;
        this.equipmentList = equipmentList;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setEquipmentList(List<Equipment> equipmentList) {
        this.equipmentList = equipmentList;
    }
    public List<Equipment> getEquipmentList() {
        return equipmentList;
    }
    public void insertEquipment(Equipment equipment) {
        equipmentList.add(equipment);
    }

}
