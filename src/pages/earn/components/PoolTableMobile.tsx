import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, VStack } from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { usePoolRewards } from "@hooks/pool/query/usePoolRewards"
import { type Row } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import { FarmIcon } from "components/Assets/FarmIcon"
import { useClaimRewards } from "hooks/pool/tx/useClaimRewards"
import { FaChevronRight } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PoolTableMobile = ({ row }: { row: Row<any> }) => {
	const navigate = useNavigate()

	const { isWalletConnected } = useChain(import.meta.env.VITE_NEUTRONNETWORK)

	const [poolRewards] = usePoolRewards({
		pool: row.original.pool
	})

	const { mutate: handleClaimRewards } = useClaimRewards({
		pool: row.original.pool
	})

	return (
		<Menu isLazy matchWidth offset={[0, -5]}>
			{({ isOpen }) => (
				<>
					<MenuButton
						_hover={{ bg: "gray.800", cursor: "pointer", shadow: "md" }}
						as={Flex}
						bg="gray.800"
						flexDir="column"
						key={row.id}
						pos="relative"
						px={3}
						py={3}
						roundedBottom={isOpen ? "0" : "1.25em"}
						roundedTop="1.25em"
						shadow="md"
						transition="0.2s all"
						w="full"
					>
						<VStack align="start" spacing={3} w="full">
							{row.getVisibleCells().map((cell, index) => {
								if (index === 3) {
									return null
								}

								if (index === 0) {
									return (
										<Flex key={cell.id} mb={2}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</Flex>
									)
								}

								return (
									<Flex key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Flex>
								)
							})}
						</VStack>
						<IconButton
							aria-label="Go to pools page"
							bg="transparent"
							icon={<FaChevronRight size="14" />}
							pos="absolute"
							right="1rem"
							size="sm"
							top="calc(50% - 1rem)"
						/>
					</MenuButton>
					<MenuList
						border="none"
						fontFamily="heading"
						fontSize="20"
						overflow="hidden"
						py={0}
						roundedBottom="1.25em"
						roundedTop="0"
						shadow="md"
					>
						<MenuItem
							icon={<HiExternalLink />}
							onClick={() => {
								navigate(`/pool/${row.original.pool.poolId}`)
							}}
						>
							Open Pool
						</MenuItem>
						{isWalletConnected && (
							<MenuItem
								icon={<FarmIcon />}
								isDisabled={poolRewards.length <= 0}
								onClick={() => {
									handleClaimRewards()
								}}
							>
								Claim Rewards
							</MenuItem>
						)}
					</MenuList>
				</>
			)}
		</Menu>
	)
}
