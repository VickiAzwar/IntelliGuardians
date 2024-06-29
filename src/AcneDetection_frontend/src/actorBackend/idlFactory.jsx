import React, { useEffect, useState } from 'react';

export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    id: IDL.Principal,
    token: IDL.Int,
    username: IDL.Text,
    email: IDL.Text,
    profile_image: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at: IDL.Nat64,
    status: IDL.Int,
  });

  const SubscribePackage = IDL.Record({
    id: IDL.Principal,
    name: IDL.Text,
    price: IDL.Int,
    period: IDL.Nat64,
    description: IDL.Text,
    created_at: IDL.Nat64,
  });

  const Orders = IDL.Record({
    id: IDL.Principal,
    order_date: IDL.Nat64,
    expired_date: IDL.Nat64,
    user_id: IDL.Principal,
    subs_id: IDL.Principal,

  });


  return IDL.Service({
    create_users: IDL.Func([IDL.Text], [User], []),
    read_users: IDL.Func([], [IDL.Vec(User)], ['query']),
    whoami: IDL.Func([], [IDL.Principal], ['query']),
    read_user_by_id: IDL.Func([IDL.Principal], [IDL.Opt(User)], ['query']),
    is_user_logged_in: IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    deduct_token: IDL.Func([IDL.Text], [IDL.Opt(User)], []),
    read_subscribe_packages: IDL.Func([], [IDL.Vec(SubscribePackage)], ['query']),
    insert_order: IDL.Func([IDL.Principal, IDL.Principal], [IDL.Opt(Orders)], []),
    check_and_update_user_status: IDL.Func([IDL.Principal], [IDL.Bool], []),
    update_profile: IDL.Func([IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Opt(IDL.Blob)], [IDL.Opt(User)], []),
    update_username_and_email: IDL.Func([IDL.Text, IDL.Text, IDL.Opt(IDL.Text)], [IDL.Opt(User)], []),
    // update_profile_image: IDL.Func([IDL.Text, IDL.Blob], [IDL.Opt(User)], []),
    update_profile_image: IDL.Func([IDL.Principal, IDL.Vec(IDL.Nat8), IDL.Text, IDL.Text], [IDL.Bool], []),

  });
};


export default idlFactory;
