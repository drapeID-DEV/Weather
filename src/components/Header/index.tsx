import styles from './Header.module.scss'

import { CITIES } from '@/shared/data/cities.data'
import { addCity } from '@/store/slices/citiesSlice'
import { AppDispatch, RootState } from '@/store/store'
import { ParamValue } from 'next/dist/server/request/params'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
	isHome: boolean
	city?: ParamValue
}

export function Header({ isHome, city }: Props) {
	const dispatch = useDispatch<AppDispatch>()
	const selectedCities = useSelector(
		(state: RootState) => state.cities.selectedCities
	)

	function handleCityAdd(cityName: string) {
		const isSelected = selectedCities.some(
			(city) => city.name.toLowerCase() === cityName.toLowerCase()
		)
		if (isSelected) return

		const cityData = CITIES.find((city) => city.name === cityName)
		if (!cityData) return

		dispatch(addCity(cityData))
	}

	return (
		<div className={styles.header}>
			{!isHome ? (
				<>
					<Link href="/">
						<Image
							src="/arrow-left.svg"
							alt="Logo"
							width={50}
							height={50}
							priority
						></Image>
					</Link>
					<h1>{city}</h1>
				</>
			) : (
				<select
					className={styles.city_select}
					value={''}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						handleCityAdd(e.target.value)
					}
				>
					<option value="" disabled>
						Select a city to add...
					</option>
					{CITIES.map((city) => (
						<option key={city.name} value={city.name}>
							{city.name}
						</option>
					))}
				</select>
			)}
			<Link href="/">
				<Image
					src="/cloud.svg"
					alt="Logo"
					width={50}
					height={50}
					priority
				></Image>
			</Link>
		</div>
	)
}
