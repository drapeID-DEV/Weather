'use client'

import { DetailCard } from '@/components/DetailCard'
import styles from './DetailInfo.module.scss'

import { Header } from '@/components/Header'
import { CITIES } from '@/shared/data/cities.data'
import { ParamValue } from 'next/dist/server/request/params'
import { useGetCityDataQuery } from '@/store/api/baseApi'
import { skipToken } from '@reduxjs/toolkit/query'

interface Props {
	city: ParamValue
}

export function DetailInfo({ city }: Props) {
	const cityData = CITIES.find((c) => c.name === city)

	const { data, isLoading } = useGetCityDataQuery(cityData ?? skipToken, {
		refetchOnMountOrArgChange: true
	})

	return (
		<>
			<Header isHome={false} city={city} />
			{isLoading ? (
				<p className={styles.loading_text}>Page is loading...</p>
			) : (
				<DetailCard data={data} />
			)}
		</>
	)
}
