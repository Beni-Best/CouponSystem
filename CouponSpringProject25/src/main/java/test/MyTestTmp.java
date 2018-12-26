package test;

import ch.qos.logback.core.net.server.Client;
import coupon.sys.core.beans.Company;
import coupon.sys.core.beans.Customer;
import coupon.sys.core.dao.db.CustomerDaoDb;
import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.AdminFacade;
import coupon.sys.core.facade.CustomerFacade;

public class MyTestTmp {
public static void main(String[] args) throws CouponSystemException {
	
	Company comp1 = new Company("Blizzard", "123321", "blizz@activision.com");
	
	CustomerDaoDb cdao = new CustomerDaoDb();
	System.out.println(cdao.getAllCustomers(comp1));
}
}
