export default interface IFileObject {
    created_at: string //"2024-01-31T11:04:15.567Z"
    id: string //"531eeead-2781-4c8a-9b13-9d6943fabc8f"
    last_accessed_at: string //"2024-01-31T11:04:15.567Z"
    metadata: Record<string, any>
    /*
    {
        eTag: string //'"d8fbbe823caf5c427ed88a68d975a448"',
        size: number //4531581,
        mimetype: string //'audio/mpeg',
        cacheControl: string //'max-age=3600',
        lastModified: string //'2024-01-31T11:04:16.000Z',
        contentLength: number //4531581
    }
     */
    name: string
    updated_at: string //"2024-01-31T11:04:15.567Z"
    path?: string
}
