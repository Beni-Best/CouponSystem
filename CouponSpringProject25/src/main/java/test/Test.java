package test;

import coupon.sys.core.beans.Company;
import coupon.sys.core.beans.Coupon;
import coupon.sys.core.beans.CouponType;
import coupon.sys.core.beans.Customer;
import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.AdminFacade;
import coupon.sys.core.facade.CompanyFacade;
import coupon.sys.core.facade.CouponClientFacade;
import coupon.sys.core.facade.CustomerFacade;
import coupon.sys.core.system.ClientType;
import coupon.sys.core.system.CouponSystem;

public class Test {
	public static void main(String[] args) throws CouponSystemException {

		Company comp1 = new Company("Blizzard", "123321", "blizz@activision.com");
		Company comp2 = new Company(1, "CDPR", "1asd45", "CDPR@corp.il");
		Company comp3 = new Company(3, "BLIZZARD", "12aaxx45", "BLaIZZARD@corp.il");
		Company comp4 = new Company(1, "Valve", "qwerrr", "Valve@corp.il");
		Company comp5 = new Company("SEMC", "3332232232311", "SEMC@hotmail.com");
		//
		Customer cust1 = new Customer(1, "maxim", "max5555");
		Customer cust2 = new Customer(1, "Beni", "54321");
		Customer cust3 = new Customer(1, "Ilmar", "321123t");
		Customer cust4 = new Customer(1, "bob", "asdw");
		Customer cust5 = new Customer(1, "dillan", "xxxffff");
		//
		Coupon coup1 = new Coupon(1, "OnePlusOne", java.sql.Date.valueOf("2018-6-17"),java.sql.Date.valueOf("2019-6-17"), 19, CouponType.HEALTH, "Thanks", 300, "http://www.pottervillemi.org/images/Tent%20Camping%20Image.jpg");
		Coupon coup2 = new Coupon(1, "FreeMeal", java.sql.Date.valueOf("2020-6-17"), java.sql.Date.valueOf("3000-5-14"),20, CouponType.HEALTH, "Good",10000, "https://cdn.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg");
		Coupon coup3 = new Coupon(3, "50% Discounts weak", java.sql.Date.valueOf("1999-6-17"),java.sql.Date.valueOf("2029-3-12"), 20, CouponType.SPORTS, "Walk Good", 5000, "https://cdn.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg");
		Coupon coup4 = new Coupon(2, "TestCoupon", java.sql.Date.valueOf("2020-6-17"),java.sql.Date.valueOf("2030-10-10"), 3, CouponType.CAMPING, "Camp is good", 50, "http://www.pottervillemi.org/images/Tent%20Camping%20Image.jpg");
		Coupon coup5 = new Coupon(5, "BrutCoupon", java.sql.Date.valueOf("2000-6-17"),java.sql.Date.valueOf("2020-10-10"), 10, CouponType.CAMPING, "Camp is good", 50, "http://www.pottervillemi.org/images/Tent%20Camping%20Image.jpg");
		Coupon coup6 = new Coupon(5, "finalCoupo", java.sql.Date.valueOf("2000-6-17"),java.sql.Date.valueOf("2020-10-10"), 10, CouponType.CAMPING, "Camp is good", 50, "http://www.pottervillemi.org/images/Tent%20Camping%20Image.jpg");

		// To use this test you have to insert a relevant username and password
		// and chose client type (CUSTOMER/COMPANY/ADMIN)
		// in order to test Admin insert "admin" into username section and
		// "1234" in password section
		String username = "admin";
		String password = "1234";
		CouponSystem cs = CouponSystem.getInstance();
		CouponClientFacade couponClientFacade = cs.login(username, password, ClientType.ADMIN);

		if (couponClientFacade instanceof AdminFacade) {
			AdminFacade admFac = (AdminFacade) couponClientFacade;
			System.out.println(admFac.getAllCustomer(comp1));		
			}
		if (couponClientFacade instanceof CompanyFacade) {
			CompanyFacade compFac = (CompanyFacade) couponClientFacade;
			compFac.createCoupon(coup6);
//			compFac.removeCoupon(coup6);
		
		
		}
		if (couponClientFacade instanceof CustomerFacade) {
			CustomerFacade custFac = (CustomerFacade) couponClientFacade;
			custFac.purchaseCoupon(coup4);
		}

		
//			cs.shutDown();
		
	}
}
