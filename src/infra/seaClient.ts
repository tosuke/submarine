import ky from 'ky'
import * as $ from 'transform-ts'
import { Post, $Post } from '../models'

export class SeaClient {
  private http: typeof ky

  constructor(readonly restEndpoint: string, readonly wsEndpoint: string, readonly seaToken: string) {
    this.http = ky.create({
      prefixUrl: restEndpoint,
      headers: [['Authorization', `Bearer ${seaToken}`]],
    })
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
    const json = await this.http.post('v1/posts', {
      json: {
        text,
        fileIds,
      },
    })
  }
}
