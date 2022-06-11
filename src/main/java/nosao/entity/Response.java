package nosao.entity;

public class Response<T> {
    private boolean success;
    private String message;
    private T data;

    public Response(T data, boolean success) {
        this(data, success, null);
    }

    public Response(T data, boolean success, String message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
    public boolean isSuccess() {
        return success;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }

    public void setData(T data) {
        this.data = data;
    }
    public T getData() {
        return data;
    }

}
