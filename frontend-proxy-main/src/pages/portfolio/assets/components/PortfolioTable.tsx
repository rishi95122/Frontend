/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssetSwitch } from "./AssetSwitch"
import {
	Button,
	chakra,
	Flex,
	Heading,
	HStack,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Spacer,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useBreakpoint,
	VStack
} from "@chakra-ui/react"
import { type ColumnDef, type SortingState } from "@tanstack/react-table"
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from "@tanstack/react-table"
import { useDebounce } from "ahooks"
import { type SetStateAction } from "react"
import { useMemo, useState } from "react"
import {
	FaAngleDoubleLeft,
	FaAngleDoubleRight,
	FaAngleLeft,
	FaAngleRight,
	FaArrowAltCircleDown,
	FaArrowAltCircleUp,
	FaSearch
} from "react-icons/fa"

export type DataTableProps<Data extends object> = {
	columns: Array<ColumnDef<Data, any>>
	data: Data[]
}

export const PortfolioTable = <Data extends object>({
	data,
	columns,
	favourites
}: DataTableProps<Data> & { favourites: string[] }) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [searchValue, setSearchValue] = useState<string>("")
	const debouncedValue = useDebounce(searchValue, { wait: 250 })
	const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
		setSearchValue(event.target.value)

	const { favoriteRows, otherRows } = useMemo(() => {
		const currentFavoriteRows = data.filter((row) => {
			if (searchValue.length > 0) {
				return (
					// @ts-expect-error types
					favourites.includes(row.denom) &&
					// @ts-expect-error types
					(row.symbol.toLowerCase().includes(debouncedValue.toLowerCase()) ||
						// @ts-expect-error types
						row.denom.toLowerCase().includes(debouncedValue.toLowerCase()))
				)
			} else {
				// @ts-expect-error types
				return favourites.includes(row.denom)
			}
		})

		const currentOtherRows = data.filter((row) => {
			if (searchValue.length > 0) {
				return (
					// @ts-expect-error types
					!favourites.includes(row.token.token) &&
					// @ts-expect-error types
					(row.symbol.toLowerCase().includes(debouncedValue.toLowerCase()) ||
						// @ts-expect-error types
						row.denom.toLowerCase().includes(debouncedValue.toLowerCase()))
				)
			} else {
				// @ts-expect-error types
				return !favourites.includes(row.denom)
			}
		})

		return { favoriteRows: currentFavoriteRows, otherRows: currentOtherRows }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [columns, data, favourites, debouncedValue])

	const table = useReactTable({
		autoResetPageIndex: false,
		columns,
		data: otherRows,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting
		}
	})

	const favTable = useReactTable({
		columns,
		data: favoriteRows ?? [],
		getCoreRowModel: getCoreRowModel()
	})

	const breakpoint = useBreakpoint({ ssr: false })

	return (
		<Flex
			_dark={{ bgGradient: "linear(to-b, gray.600, gray.800)" }}
			bg="white"
			bgGradient="linear(to-b, gray.600, gray.800)"
			flexDir="column"
			px={2}
			py={2}
			rounded="1.25em"
			shadow="md"
			maxW="6xl"
			w="full"
		>
			{breakpoint === "base" || breakpoint === "sm" ? (
				<VStack align="start" pb={2} px={0} w="full">
					<HStack justify="space-between" w="full">
						<Heading
							bgClip="text"
							bgGradient="linear(45deg, brand.1, brand.2)"
							fontSize={{ base: "xl", md: "3xl" }}
						>
							My Assets
						</Heading>
						<HStack justify="end" ml="auto">
							<Text>Zero Balance</Text>
							<AssetSwitch />
						</HStack>
					</HStack>
					<InputGroup w="full">
						<InputLeftElement pointerEvents="none">
							<Icon _dark={{ color: "white" }} as={FaSearch} color="white" />
						</InputLeftElement>
						<Input
							_dark={{
								_placeholder: { color: "white" },
								bg: "gray.700",
								color: "white"
							}}
							_placeholder={{ color: "gray.800" }}
							bg="gray.700"
							color="white"
							fontSize="14"
							onChange={handleChange}
							placeholder="Search..."
							rounded="1.25em"
							shadow="md"
							value={searchValue}
							variant="filled"
						/>
					</InputGroup>
				</VStack>
			) : (
				<HStack pb={2} px={0} w="full">
					<Heading
						bgClip="text"
						bgGradient="linear(45deg, brand.1, brand.2)"
						fontSize={{ base: "xl", md: "3xl" }}
					>
						My Assets
					</Heading>
					<Spacer />
					<HStack>
						<Text>Show Zero Balance</Text>
						<AssetSwitch />
					</HStack>
					<InputGroup maxW="12rem">
						<InputLeftElement pointerEvents="none">
							<Icon _dark={{ color: "white" }} as={FaSearch} color="white" />
						</InputLeftElement>
						<Input
							_dark={{
								_placeholder: { color: "white" },
								bg: "gray.700",
								color: "white"
							}}
							_hover={{ bg: "gray.800" }}
							_placeholder={{
								color: "white"
							}}
							bg="gray.700"
							color="gray.800"
							fontSize="14"
							onChange={handleChange}
							placeholder="Search..."
							rounded="1.25em"
							shadow="md"
							value={searchValue}
							variant="filled"
						/>
					</InputGroup>
				</HStack>
			)}
			<Table pos="relative">
				<Thead w="full">
					{table.getHeaderGroups().map((headerGroup) => {
						return (
							<Tr key={headerGroup.id} rounded="1.25em">
								{headerGroup.headers.map((header) => {
									const meta: any = header.column.columnDef.meta
									return (
										<Th
											_dark={{ bg: "gray.700", color: "white" }}
											_first={{
												roundedStart: "1.25em"
											}}
											_last={{ roundedEnd: "1.25em" }}
											bg="gray.700"
											borderBottom="none"
											color="white"
											fontSize="14"
											fontWeight="400"
											isNumeric={meta?.isNumeric}
											key={header.id}
											onClick={header.column.getToggleSortingHandler()}
											px={2}
											py={1.5}
											textTransform="capitalize"
										>
											{/* eslint-disable-next-line no-negated-condition */}
											{header.column.columnDef.header !== "Actions" ? (
												<Button
													_dark={{
														_hover: {
															bgGradient: "linear(45deg, brand.1,brand.2)",
															color: "gray.800"
														},
														bg: "gray.600",
														color: "white"
													}}
													_hover={{
														bgGradient: "linear(45deg, brand.1,brand.2)"
													}}
													bg="gray.600"
													color="white"
													rounded="0.8em"
													size="sm"
												>
													{flexRender(header.column.columnDef.header, header.getContext())}

													<Flex ps={1}>
														{header.column.getIsSorted() ? (
															header.column.getIsSorted() === "desc" ? (
																<FaArrowAltCircleDown aria-label="sorted descending" />
															) : (
																<FaArrowAltCircleUp aria-label="sorted ascending" />
															)
														) : null}
													</Flex>
												</Button>
											) : (
												"Actions"
											)}
										</Th>
									)
								})}
							</Tr>
						)
					})}
				</Thead>
				<Tbody>
					{favTable.getRowModel().rows.map((row) => (
						<Tr
							_dark={{
								_hover: { bg: "gray.700" }
							}}
							_hover={{ bg: "gray.600", shadow: "md" }}
							key={row.id}
							pos="relative"
							rounded="1.25em"
							top="0.5rem"
						>
							{row.getVisibleCells().map((cell) => {
								// see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
								const meta: any = cell.column.columnDef.meta
								return (
									<Td
										_first={{ roundedStart: "1.25em" }}
										_last={{ roundedEnd: "1.25em" }}
										borderBottom="none"
										isNumeric={meta?.isNumeric}
										key={cell.id}
										px={{ base: 1, md: 3 }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								)
							})}
						</Tr>
					))}
					{table.getRowModel().rows.map((row) => (
						<Tr
							_dark={{
								_hover: { bg: "gray.700" }
							}}
							_hover={{ bg: "gray.600", shadow: "md" }}
							key={row.id}
							pos="relative"
							rounded="1.25em"
							top="0.5rem"
						>
							{row.getVisibleCells().map((cell) => {
								// see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
								const meta: any = cell.column.columnDef.meta
								return (
									<Td
										_first={{ roundedStart: "1.25em" }}
										_last={{ roundedEnd: "1.25em" }}
										borderBottom="none"
										isNumeric={meta?.isNumeric}
										key={cell.id}
										px={{ base: 1, md: 3 }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								)
							})}
						</Tr>
					))}
				</Tbody>
			</Table>
			<HStack justify="center" mt={{ base: 4, md: 6 }} w="full">
				<IconButton
					_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
					_disabled={{
						_active: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						_dark: { bg: "whiteAlpha.200" },
						_focus: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					}}
					_hover={{ bg: "offwhite.3" }}
					aria-label="firstPage"
					bg="offwhite.4"
					icon={<FaAngleDoubleLeft />}
					isDisabled={!table.getCanPreviousPage()}
					onClick={() => table.setPageIndex(0)}
					rounded="0.8em"
					shadow="md"
					size="md"
				/>
				<IconButton
					_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
					_disabled={{
						_active: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						_dark: { bg: "whiteAlpha.200" },
						_focus: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					}}
					_hover={{ bg: "offwhite.3" }}
					aria-label="previousPage"
					bg="offwhite.4"
					icon={<FaAngleLeft />}
					isDisabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
					rounded="0.8em"
					shadow="md"
					size="md"
				/>
				<Text fontWeight="900">
					{table.getState().pagination.pageIndex + 1}{" "}
					<chakra.span fontWeight="400" px="2px">
						of
					</chakra.span>{" "}
					{table.getPageCount()}
				</Text>
				<IconButton
					_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
					_disabled={{
						_active: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						_dark: { bg: "whiteAlpha.200" },
						_focus: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					}}
					_hover={{ bg: "offwhite.3" }}
					aria-label="nextPage"
					bg="offwhite.4"
					icon={<FaAngleRight />}
					isDisabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
					rounded="0.8em"
					shadow="md"
					size="md"
				/>
				<IconButton
					_dark={{ _hover: { bg: "gray.600" }, bg: "gray.700" }}
					_disabled={{
						_active: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						_dark: { bg: "whiteAlpha.200" },
						_focus: {
							bg: "whiteAlpha.200",
							color: "whiteAlpha.500",
							cursor: "not-allowed"
						},
						bg: "blackAlpha.300",
						color: "whiteAlpha.500",
						cursor: "not-allowed"
					}}
					_hover={{ bg: "offwhite.3" }}
					aria-label="lastPage"
					bg="offwhite.4"
					icon={<FaAngleDoubleRight />}
					isDisabled={!table.getCanNextPage()}
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					rounded="0.8em"
					shadow="md"
					size="md"
				/>
			</HStack>
		</Flex>
	)
}
