package nosao.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Ability {

    private int health;
    private int attack;
    private int defense;
    private int reaction;
    private int agile;

    public Ability() {
        this(0, 0, 0, 0, 0);
    }

    public Ability(int health, int attack, int defense, int reaction, int agile) {
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.reaction = reaction;
        this.agile = agile;
    }

    public String toString() {
        return String.format("{ health: %d, attack: %d, defense: %d, reaction: %d, agile: %d }",
                health, attack, defense, reaction, agile);
    }

    public void setHealth(int health) {
        this.health = health;
    }
    public int getHealth() {
        return health;
    }

    public void setAttack(int attack) {
        this.attack = attack;
    }
    public int getAttack() {
        return attack;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }
    public int getDefense() {
        return defense;
    }

    public void setReaction(int reaction) {
        this.reaction = reaction;
    }
    public int getReaction() {
        return reaction;
    }

    public void setAgile(int agile) {
        this.agile = agile;
    }
    public int getAgile() {
        return agile;
    }

}
