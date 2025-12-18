import styles from './CitySelect.module.scss'

import { CITIES } from '@/shared/data/cities.data'
import { addCity } from '@/store/slices/citiesSlice'
import { resetCursor, setCursorHover } from '@/store/slices/cursorSlice'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'

export function CitySelect() {
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
		<select
			onMouseEnter={() => dispatch(setCursorHover('#353535ff'))}
			onMouseLeave={() => dispatch(resetCursor())}
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
	)
}
