import React, { useEffect, useState } from "react";
import { getExpenses, getSortedExpenses } from "../../services/ExpenseService";
import { toast } from "react-toastify";
import { MdInfo } from "react-icons/md";
import ExpenseView from "./ExpenseView"
import { Button,TextInput,Label,Datepicker } from "flowbite-react";

function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filters,setFilters]=useState({
  minPrice:"",
  maxPrice:"",
  fromDate:"",
  toDate:"",
  })

  useEffect(() => {
    if (searchKeyword.trim() == "") {
      setExpenses([...allExpenses]);
      return;
    }

    if (searchKeyword.trim() != "" && searchKeyword.trim().length > 2) {
      const searchedElements = allExpenses.filter((exp) =>
        exp.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      if (searchedElements.length <= 0) {
        return;
      }

      setExpenses(searchedElements);
      return;
    }
  }, [searchKeyword]);

  async function loadExpense(minPrice="",maxPrice="",fromDate="",toDate="") {
      try {
        if(!fromDate && !toDate)
        {
        const exp = await getExpenses(minPrice,maxPrice);
        console.log(exp);
        setExpenses(exp);
        setAllExpenses(exp);
        return;
        }
        if (!minPrice && !maxPrice)
        {
        const expense=await getSortedExpenses(fromDate,toDate)
        setExpenses(expense);
        setAllExpenses(expense);
        return
      } 
    }catch (error) {
        toast.error("Error in loading expenses");
        console.log(error);
      }
    
    }

  useEffect(() => {
    //loadExpese
    

    loadExpense();
  }, []);

  const applyFilter=async()=>{
loadExpense(filters.minPrice,filters.maxPrice,filters.fromDate,filters.toDate)
}

const clearFilter=()=>
{
  setFilters({
    minPrice:"",
    maxPrice:"",
    fromDate:"",
    toDate:"",
  })

  setSearchKeyword("")
  loadExpense()
}
  const removeExpense = (expenseId) => {
    const updatedExpenses = expenses.filter((exp) => exp._id !== expenseId);
    const newAllExpense=allExpenses.filter((exp) => exp._id != expenseId);
    setExpenses([...updatedExpenses]);
    setAllExpenses([...newAllExpense]);
  }

const handleExpenseUpdated = (updated) => {
    setExpenses((prev) => prev.map((e) => (e._id === updated._id ? { ...e, ...updated } : e)));
    setAllExpenses((prev) => prev.map((e) => (e._id === updated._id ? { ...e, ...updated } : e)));
  }

  return (
    <div className="min-h-screen ">
      {/* heading */}
 {/* <h1 className="text-3xl text-end w-fit font-semibold">
                {expenses.length} Items
              </h1> */}
      {/* search bar */}
      <div className="flex gap-3 flex-wrap ">
              <input
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
                value={searchKeyword}
                type="text"
                id="voice-search"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 p-1.5 "
                placeholder="Search your expense here "
                required
              />
             
            </div>

      <div className="filter_container  items-center flex justify-between gap-2 py-2">
        <div className="flex gap-2 flex-wrap">
          <div className="flex flex-col">
            <span className="text-black-600 px-1 text-xs font-semibold">
              Select min price
            </span>
            <TextInput
              onChange={(e) => {
                // console.log(e.target.value);
                setFilters({
                  ...filters,
                  minPrice: e.target.value,
                });
              }}
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilter(); // Call your filter function
                   }
            }}
              value={filters.minPrice}
              id="minPrice"
              sizing="sm"
              color=""
              placeholder="Min Price"
            />
          </div>
          <div className="flex flex-col">
           
              
            <span className="text-black-600 px-1 text-xs font-semibold">
              Select max price
            </span>
            <TextInput
              onChange={(e) => {
                setFilters({
                  ...filters,
                  maxPrice: e.target.value,
                });
              }}
              onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilter(); // Call your filter function
                   }
            }}
              value={filters.maxPrice}
              id="maxPrice"
              sizing="sm"
              color=""
              placeholder="Max Price"
            />
          </div>

          <div className="flex flex-col">
           <span className="text-black-600 px-1 text-xs font-semibold">
              From Date
              </span>
            
            <Datepicker  
            onClick={(e) => {
                setFilters({
                  ...filters,
                  fromDate: e.target.value,
                });
              }}
            id="fromDate" sizing="sm" placeholder="From Date"color="" />
          </div>

          <div className="flex flex-col">
            <span className="text-black-600 px-1 text-xs font-semibold">
               To Date
            </span>
             
            
            <Datepicker 
            onClick={(e) => {
                setFilters({
                  ...filters,
                  toDate: e.target.value,
                });
              }}
            id="fromDate" sizing="sm" placeholder="From Date" color="" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={applyFilter}
            className="cursor-pointer"
            size="sm"
            color={"green"}
          >
            Apply Filter
          </Button>
          <Button
            onClick={clearFilter}
            className="cursor-pointer onClick:border-0"
            size="sm"
            color={"red"}
          >
            Clear Filter
          </Button>
        </div>
      </div>

      {expenses.length > 0 && (
        <div>
          <div>
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 mt-8">
  {expenses.map((expense, index) => (
    <div
      key={index}
      className="w-full md:w-1/2 lg:w-1/3"
    >
      <ExpenseView
        removeExpense={removeExpense}
        onUpdateExpense={handleExpenseUpdated}
        expense={expense}
      />
    </div>
  ))}
            </div>
          </div>
        </div>
      )}
      {expenses.length <= 0 && (
        <div className="flex flex-col justify-center mt-10 items-center gap-2">
          <MdInfo className="text-red-400" size={38} />
          <h1 className="text-center text-3xl font-semibold">
            No expense available
          </h1>
        </div>
      )}
    </div>
  );
}

export default ViewExpenses;
