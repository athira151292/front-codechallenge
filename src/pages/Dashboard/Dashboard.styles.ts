import React from "react";
import styled from "styled-components";

export const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const DashboardWrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
    ul {
        flex-basis: 80%;
    }
`