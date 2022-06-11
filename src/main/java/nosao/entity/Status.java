package nosao.entity;

public class Status {
    public boolean success;
    public String message;

    public Status(boolean success) {
        this(success, "");
    }

    public Status(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

}
