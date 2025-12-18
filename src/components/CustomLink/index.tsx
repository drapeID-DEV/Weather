import { resetCursor, setCursorHover } from '@/store/slices/cursorSlice'
import { AppDispatch } from '@/store/store'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
	path: string
}

export default function CustomLink({
	children,
	path
}: PropsWithChildren<Props>) {
	const dispatch = useDispatch<AppDispatch>()

	return (
		<Link
			onMouseEnter={() => dispatch(setCursorHover('#353535ff'))}
			onMouseLeave={() => dispatch(resetCursor())}
			href={path}
		>
			{children}
		</Link>
	)
}
