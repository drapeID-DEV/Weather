'use client'

import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import { AppDispatch } from '@/store/store'
import { removeCity } from '@/store/slices/citiesSlice'
import { resetCursor, setCursorHover } from '@/store/slices/cursorSlice'
import { ICity } from '@/shared/types/city.type'
import { WeatherCardView } from './WeatherCardView'
import { useGetCityDataQuery } from '@/store/api/baseApi'

interface Props {
	city: ICity
}

export function WeatherCard({ city }: Props) {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()

	const { data, isLoading, refetch } = useGetCityDataQuery(city)

	const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		e.preventDefault()
		dispatch(removeCity(city.name))
	}

	const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		e.preventDefault()
		refetch()
	}

	return (
		<WeatherCardView
			cityName={city.name}
			isLoading={isLoading}
			tempData={data}
			onClick={() => router.push(`/${city.name}`)}
			onRemove={handleRemove}
			onUpdate={handleUpdate}
			onMouseEnter={() => dispatch(setCursorHover('#353535ff'))}
			onMouseLeave={() => dispatch(resetCursor())}
		/>
	)
}
