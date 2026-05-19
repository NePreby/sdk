import { HanzoClient } from '../client'
import type { Upload, PresignedUrl } from '../types'

/** Admin operations for file uploads. */
export class UploadAdmin {
  constructor(private client: HanzoClient) {}

  /** Upload a file. Accepts file metadata; actual upload uses the returned URL. */
  upload(data: { filename: string; mimeType: string; access?: 'public' | 'private' }) {
    return this.client.post<Upload>('/admin/uploads', data)
  }

  /** Get a presigned URL for direct file upload. */
  getPresignedUrl(data: { filename: string; mimeType: string; access?: 'public' | 'private' }) {
    return this.client.post<PresignedUrl>('/admin/uploads/presigned', data)
  }
}
