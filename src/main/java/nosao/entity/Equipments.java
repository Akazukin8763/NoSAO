package nosao.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Equipments {

    private Armor armor;
    private Weapon weapon;

    public Equipments() {

    }

    public Equipments(Armor armor, Weapon weapon) {
        this.armor = armor;
        this.weapon = weapon;
    }

    public String toString() {
        return String.format("{ armor: %s, weapon: %s }", armor, weapon);
    }

    public void setArmor(Armor armor) {
        this.armor = armor;
    }
    public Armor getArmor() {
        return armor;
    }

    public void setWeapon(Weapon weapon) {
        this.weapon = weapon;
    }
    public Weapon getWeapon() {
        return weapon;
    }

}
