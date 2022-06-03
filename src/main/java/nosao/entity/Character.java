package nosao.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "character")
public class Character {

    private @Id String id;
    private String name;
    private String description;
    private Equipment equipment;
    private Ability ability;

    public Character() {

    }

    public Character(String id,
                     String name, String description,
                     Equipment equipment, Ability ability) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.equipment = equipment;
        this.ability = ability;
    }

    public String toString() {
        return String.format("{ id: %s, name: %s, description: %s, equipment: %s, ability: %s }",
                id, name, description, equipment, ability);
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

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }
    public Equipment getEquipment() {
        return equipment;
    }

    public void setAbility(Ability ability) {
        this.ability = ability;
    }
    public Ability getAbility() {
        return ability;
    }

}
