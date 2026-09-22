export interface DashboardCardValue {
  value: number;
  subtext: number;
}
 export interface RecentStudent {
  id: number;
  first_name: string;
  last_name: string;
  admission_number: string | null;
  photo: string;
}
export interface AdminDashboardResponse {
  cards: {
    term_earning: DashboardCardValue;
    students: DashboardCardValue;
    teachers: DashboardCardValue;
    parents: DashboardCardValue;
    today_income: number;
    pending_fee_payments: number;
    absence_today: number;
    new_enrolment: number;
  };
  charts: {
    income_expense: {
      labels: string[];
      income: number[];
      expense: number[];
    };
    attendance: {
      date: string;
      present: number;
      absent: number;
    }[];
  };
  recent_students: RecentStudent[];
  inventory: {
    total_items: number;
    stock_quantity: number;
    stock_value: number;
  };
  recent_sales: unknown[];
}