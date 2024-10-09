export class SseService {
    private sseEndpoint = "http://localhost:8081/api/sse/subscribe";
    private eventSource?: EventSource = undefined;


    public subscribe() {
        this.eventSource = new EventSource(this.sseEndpoint);

        this.eventSource.onopen = (ev => console.log(ev));
        this.eventSource.onerror = (err => {
            console.log(err);
            return null;
        });

        this.eventSource.onmessage = (msg => {
            if (msg.data == "heartbeat") {
                console.log("heartbeat ignored");
            } else {
                console.log("other event need actions");
            }
        });
    }
}