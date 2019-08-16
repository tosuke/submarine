import ky from 'ky'
import $ from 'transform-ts'
import { Post, $Post } from '../models'
import { RxWebSocket, ConnectionState } from './rxWebSocket'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

const $PostMessage = $.obj({
  type: $.string,
  content: $Post,
})

export class SeaClient {
  private http: typeof ky
  private publicTimelineSocket: RxWebSocket
  readonly publicTimeline$: Observable<Post>
  readonly publicTimelineConnectionState$: Observable<ConnectionState>

  constructor(readonly restEndpoint: string, readonly wsEndpoint: string, readonly seaToken: string) {
    this.http = ky.create({
      prefixUrl: restEndpoint,
      headers: [['Authorization', `Bearer ${seaToken}`]],
    })

    this.publicTimelineSocket = new RxWebSocket(() => {
      const ws = new WebSocket(wsEndpoint)
      ws.addEventListener('open', () => {
        ws.send(
          JSON.stringify({
            type: 'connect',
            stream: 'v1/timelines/public',
            token: seaToken,
          }),
        )
      })
      return ws
    }, 60 * 1000)

    this.publicTimeline$ = this.publicTimelineSocket.messages$.pipe(
      mergeMap(message => {
        const result = $PostMessage.transform(message)
        if (result.type === 'ok') {
          return [result.value.content]
        } else {
          return []
        }
      }),
    )

    this.publicTimelineConnectionState$ = this.publicTimelineSocket.connectionState$
  }

  async fetchLatestPostsFromPublicTimeline(count: number = 20, sinceId?: number): Promise<Post[]> {
    const qs = []
    qs.push(`count=${count}`)
    if (sinceId) {
      qs.push(`sinceId=${sinceId}`)
    }
    const json = await this.http.get(`v1/timelines/public?${qs.join('&')}`).json()
    return $.array($Post).transformOrThrow(json)
  }

  async fetchMorePostsFromPublicTimeline(count: number, maxId: number): Promise<Post[]> {
    const qs = []
    qs.push(`count=${count}`)
    qs.push(`maxId=${maxId}`)
    const json = await this.http.get(`v1/timelines/public?${qs.join('&')}`).json()
    return $.array($Post).transformOrThrow(json)
  }

  async doPost(text: string, fileIds?: number[]): Promise<void> {
    await this.http.post('v1/posts', {
      json: {
        text,
        fileIds,
      },
    })
  }
}
