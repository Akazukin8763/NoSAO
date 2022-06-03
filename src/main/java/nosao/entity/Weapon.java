package nosao.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Weapon {

    private String main;
    private String sub;

    public Weapon() {

    }

    public Weapon(String main, String sub) {
        this.main = main;
        this.sub = sub;
    }

    public String toString() {
        return String.format("{ main: %s, sub: %s }", main, sub);
    }

    public void setMain(String main) {
        this.main = main;
    }
    public String getMain() {
        return main;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }
    public String getSub() {
        return sub;
    }

}
