package nosao.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Armor {

    private String helmet;
    private String chestplate;
    private String vambrace;
    private String cuish;

    public Armor() {

    }

    public Armor(String helmet, String chestplate, String vambrace, String cuish) {
        this.helmet = helmet;
        this.chestplate = chestplate;
        this.vambrace = vambrace;
        this.cuish = cuish;
    }

    public String toString() {
        return String.format("{ helmet: %s, chestplate: %s, vambrace: %s, cuish: %s }",
                helmet, chestplate, vambrace, cuish);
    }

    public void setHelmet(String helmet) {
        this.helmet = helmet;
    }
    public String getHelmet() {
        return helmet;
    }

    public void setChestplate(String chestplate) {
        this.chestplate = chestplate;
    }
    public String getChestplate() {
        return chestplate;
    }

    public void setVambrace(String vambrace) {
        this.vambrace = vambrace;
    }
    public String getVambrace() {
        return vambrace;
    }

    public void setCuish(String cuish) {
        this.cuish = cuish;
    }
    public String getCuish() {
        return cuish;
    }

}
