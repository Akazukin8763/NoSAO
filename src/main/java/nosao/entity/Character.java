package nosao.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "character")
public class Character {

    private @Id String id;
    private String name;
    private String description;
    private Equipments equipments;
    private Ability ability;

    public Character() {
        this("", "", "", new Equipments(), new Ability());
    }

    public Character(String id,
                     String name, String description,
                     Equipments equipments, Ability ability) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.equipments = equipments;
        this.ability = ability;
    }

    public String toString() {
        return String.format("{ id: %s, name: %s, description: %s, equipments: %s, ability: %s }",
                id, name, description, equipments, ability);
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getDescription() {
        return description;
    }

    public void setEquipments(Equipments equipments) {
        this.equipments = equipments;
    }
    public Equipments getEquipments() {
        return equipments;
    }

    public void setAbility(Ability ability) {
        this.ability = ability;
    }
    public Ability getAbility() {
        return ability;
    }

}
