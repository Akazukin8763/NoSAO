package nosao.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "equipment")
public class Equipment {

    private @Id String id;
    private String type;
    private String name;
    private String img;
    private Ability ability;

    public Equipment() {

    }

    public Equipment(String id, String type, String name, String img, Ability ability) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.img = img;
        this.ability = ability;
    }

    public String toString() {
        return String.format("{ id: %s, type: %s, name: %s, img: %s, ability: %s }",
                id, type, name, img, ability);
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getId() {
        return id;
    }

    public void setType(String type) {
        this.type = type;
    }
    public String getType() {
        return type;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setImg(String img) {
        this.img = img;
    }
    public String getImg() {
        return img;
    }

    public void setAbility(Ability ability) {
        this.ability = ability;
    }
    public Ability getAbility() {
        return ability;
    }

}
