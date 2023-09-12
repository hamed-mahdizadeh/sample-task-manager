import { faker } from "@faker-js/faker";
import { UserInfoDetails, UserInfoSummary } from "../types/user";
import { Task } from "../types/task";

const listLength = 200;


//Generate Dummy user summary info
const usersInfoSummaryList: UserInfoSummary[] = [];
for (let i = 0; i < listLength; i++) {
  const userInfoSummary: UserInfoSummary = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 99  }),
    role: faker.helpers.arrayElement(['Admin', 'Author', 'Subscriber']),
  };
  usersInfoSummaryList.push(userInfoSummary);
}

//Generate Dummy user details info based on summary info
const usersInfoDetailsList: UserInfoDetails[] = usersInfoSummaryList.map((summary) => ({
  lastName: faker.person.lastName(),
  address: {
    Country: faker.location.country(),
    State: faker.location.state(),
    City: faker.location.city(),
    PostalCode: faker.location.zipCode(),
    Line1: faker.location.streetAddress(),
    Line2: faker.location.secondaryAddress(),
  },
  profilePicture: faker.image.avatar(),
  ...summary
}));



export  const dummyUsersInfoSummaries = usersInfoSummaryList;
export const dummyUsersInfoDetails = usersInfoDetailsList;