export default interface IFetchOptions {
	url: string
	method?: string
	// eslint-disable-next-line
	data?: any
	exStatus?: number
	// eslint-disable-next-line
	onSuccess?: (response: any) => void
	onError?: (status: number) => void
}