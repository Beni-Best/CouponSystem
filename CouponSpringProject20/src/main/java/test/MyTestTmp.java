package test;

import ch.qos.logback.core.net.server.Client;
import coupon.sys.core.beans.Customer;
import coupon.sys.core.exceptions.CouponSystemException;
import coupon.sys.core.facade.AdminFacade;
import coupon.sys.core.facade.CustomerFacade;

public class MyTestTmp {
public static void main(String[] args) throws CouponSystemException {
	Customer c1 = new Customer();
	CustomerFacade custFac = new CustomerFacade(c1);
	System.out.println(custFac.getAllCouponsByPrice(10000.0));
}
}
