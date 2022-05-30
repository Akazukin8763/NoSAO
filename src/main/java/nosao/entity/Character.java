package nosao.entity;

public class Character {
    private String id;
    private String name;
    private String description;
    private String helmet;
    private String chestplate;
    private String vambrace;
    private String cuish;
    private String main;
    private String sub;
    private int health;
    private int attack;
    private int defense;
    private int reaction;
    private int agile;

    public Character(){

    }
    public Character(String id, String name, String description, String helmet, String chestplate, String vambrace, String cuish, String main,
                     String sub, int health, int attack, int defense, int reaction, int agile){
        this.id = id;
        this.name = name;
        this.description = description;
        this.helmet = helmet;
        this.chestplate = chestplate;
        this.vambrace = vambrace;
        this.cuish = cuish;
        this.main = main;
        this.sub = sub;
        this.health = health;
        this .attack = attack;
        this.defense = defense;
        this.reaction = reaction;
        this.agile = agile;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}