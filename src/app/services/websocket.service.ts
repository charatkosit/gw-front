import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ReadOptions } from '../interfaces/ReadOptions';
import { filter, first, Observable, Observer, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Observable((observer: Observer<any>) => {
    this.socket$.subscribe({
      next: (msg) => observer.next(msg),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
  public messages$ = this.messagesSubject$.pipe();


  constructor() {
    this.connect();

  }

  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket('ws://localhost:14820/TDKWAgent');
    }
  }


  sendCommand(command: string, data: any): void {
    this.socket$.next({ command, data });
  }

  waitForMessage(expectedMessage: string): Promise<any> {
    return this.socket$.pipe(
      filter((message: any) => message.Message === expectedMessage),
      first()
    ).toPromise();
  }
  
}
