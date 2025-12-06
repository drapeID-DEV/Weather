import type { Metadata } from 'next'
import { DetailInfo } from './DetailInfo'
import { Params } from 'next/dist/server/request/params'

export const metadata: Metadata = {
	title: 'City info',
	description: 'Explore more info about city weather.'
}

export default async function DetailInfoPage({
	params
}: {
	params: Promise<Params>
}) {
	const { cityName } = await params
	return <DetailInfo city={cityName} />
}
