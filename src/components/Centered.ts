import styled from 'styled-components';

const Centered = styled.div<{ column?: boolean }>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${({ column }) => (column ? 'column' : 'row')};
    & > * + * {
        margin-left: ${({ column }) => (column ? 0 : '1rem')};
        margin-top: ${({ column }) => (column ? '1rem' : 0)};
    }
`;

export default Centered;