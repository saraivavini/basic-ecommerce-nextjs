'use client';
import useQueryParams from "@/hooks/useQueryParams";

type PageButtonProps = { children?: React.ReactNode, selected: Boolean, disabled: Boolean, onClick: () => void }

function PageButton({ children, selected, disabled, onClick }: PageButtonProps) {
  const className = selected ? "text-white bg-black" : "hover:bg-black hover:text-white bg-white";

  return (
    <button className={`rounded-full w-12 h-12 drop-shadow-sm ${className}`} disabled={!!disabled} onClick={onClick}>
      <p className="text-4xl font-semibold align-middle">
        {children}
      </p>
    </button >
  )
}

type PaginationControllerProps = {
  pages: number;
  currentPage: number;
}

export default function PaginationController({ pages, currentPage }: PaginationControllerProps) {
  const { setQueryParams } = useQueryParams();

  const handlePageChange = (page: number) => {
    setQueryParams({ page });
  }

  return (
    <div className="flex flex-1 align-center justify-center space-x-4">
      <PageButton selected={false} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} >{"<"}</PageButton>
      {Array.from({ length: pages }).map((_, index) => {
        const selected = currentPage === index + 1;
        return (
          <PageButton key={index} selected={selected} disabled={selected} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PageButton>
        )
      }
      )}
      <PageButton selected={false} disabled={currentPage === pages} onClick={() => handlePageChange(currentPage + 1)}>{">"}</PageButton>
    </div>
  )
}
